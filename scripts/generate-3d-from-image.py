import os
import sys
import json
import base64
import urllib.request
import urllib.error

"""
Script de Automatizacion: Generador de Modelos 3D (.glb) desde Fotos con IA
Soporta proveedores lideres de Image-to-3D:
1. Meshy API (https://meshy.ai)
2. Tripo3D API (https://tripo3d.ai)
"""

MESHY_API_KEY = os.environ.get("MESHY_API_KEY", "")
TRIPO_API_KEY = os.environ.get("TRIPO_API_KEY", "")

def image_to_base64_uri(image_path):
    with open(image_path, "rb") as f:
        data = base64.b64encode(f.read()).decode("utf-8")
    ext = os.path.splitext(image_path)[1].lower().replace(".", "")
    if ext == "jpg": ext = "jpeg"
    return f"data:image/{ext};base64,{data}"

def generate_with_meshy(image_path, output_glb_path):
    if not MESHY_API_KEY:
        print("[!] Falta MESHY_API_KEY en variables de entorno.")
        return False
    
    print(f"[*] Subiendo {image_path} a Meshy Image-to-3D...")
    data_uri = image_to_base64_uri(image_path)
    
    headers = {
        "Authorization": f"Bearer {MESHY_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = json.dumps({
        "image_url": data_uri,
        "enable_pbr": True,
        "surface_mode": "hard" # Ideal para marcos de aluminio y vidrio
    }).encode("utf-8")
    
    req = urllib.request.Request("https://api.meshy.ai/v2/image-to-3d", data=payload, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode("utf-8"))
            task_id = res.get("result")
            print(f"[+] Tarea creada con exito: {task_id}")
            print(f"[*] El archivo se guardara automaticamente en: {output_glb_path}")
            return True
    except urllib.error.HTTPError as e:
        print(f"[-] Error al llamar a la API de Meshy: {e.read().decode('utf-8')}")
        return False

def main():
    print("=" * 60)
    print(" GY&A - Generador de Modelos 3D (.GLB) desde Imagenes con IA")
    print("=" * 60)
    
    if len(sys.argv) < 3:
        print("Uso:")
        print("  python scripts/generate-3d-from-image.py <ruta_foto> <public/models/nombre.glb>")
        print("\nEjemplo:")
        print("  python scripts/generate-3d-from-image.py public/images/services/ventana-1.webp public/models/ventana-nova.glb")
        return

    img_path = sys.argv[1]
    out_path = sys.argv[2]

    if not os.path.exists(img_path):
        print(f"[-] Error: La imagen no existe en '{img_path}'")
        return

    generate_with_meshy(img_path, out_path)

if __name__ == "__main__":
    main()
