const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
                callback(path.join(dir, f));
            }
        }
    });
}

walkDir('src', function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes('react-router-dom')) {
        // Reemplazar imports
        if (content.includes('import { Link as RouterLink } from "react-router-dom"')) {
            content = content.replace('import { Link as RouterLink } from "react-router-dom"', 'import RouterLink from "next/link"');
            changed = true;
        } else if (content.includes('import { Link as RouterLink, useLocation } from "react-router-dom"')) {
            content = content.replace('import { Link as RouterLink, useLocation } from "react-router-dom"', 'import RouterLink from "next/link";\nimport { usePathname as useLocation } from "next/navigation";');
            changed = true;
        } else if (content.includes('import { Link } from "react-router-dom"')) {
            content = content.replace('import { Link } from "react-router-dom"', 'import Link from "next/link"');
            changed = true;
        } else if (content.includes('import { useNavigate } from "react-router-dom"')) {
            content = content.replace('import { useNavigate } from "react-router-dom"', 'import { useRouter as useNavigate } from "next/navigation"');
            changed = true;
        } else if (content.includes('import { useParams } from "react-router-dom"')) {
            content = content.replace('import { useParams } from "react-router-dom"', 'import { useParams } from "next/navigation"');
            changed = true;
        } else if (content.includes('import { useLocation } from "react-router-dom"')) {
            content = content.replace('import { useLocation } from "react-router-dom"', 'import { usePathname as useLocation } from "next/navigation"');
            changed = true;
        } else if (content.includes('import { useNavigate, To } from "react-router-dom"')) {
            content = content.replace('import { useNavigate, To } from "react-router-dom"', 'import { useRouter as useNavigate } from "next/navigation"');
            changed = true;
        } else if (content.includes('import { NavLink, useLocation } from "react-router-dom"')) {
            content = content.replace('import { NavLink, useLocation } from "react-router-dom"', 'import { usePathname as useLocation } from "next/navigation";\nimport NavLink from "next/link";');
            changed = true;
        } else if (content.includes('import { Outlet } from "react-router-dom"')) {
            content = content.replace('import { Outlet } from "react-router-dom"', '');
            content = content.replace('<Outlet />', '{children}');
            changed = true;
        }

        // Reemplazar <Link to= con <Link href=
        if (content.includes('to=')) {
            content = content.replace(/<RouterLink([^>]*)to=/g, '<RouterLink$1href=');
            content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');
            content = content.replace(/<NavLink([^>]*)to=/g, '<NavLink$1href=');
            changed = true;
        }

        // Reemplazar uso de location.pathname con solo location (ya que useLocation ahora es usePathname y devuelve un string, no un objeto)
        if (content.includes('location.pathname')) {
            content = content.replace(/location\.pathname/g, 'location');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Migrated: ' + filePath);
        }
    }
});
