#!/bin/bash
P=gya-app-4c8a9
FS="http://127.0.0.1:8081/v1/projects/$P/databases/(default)/documents"
AUTH="http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=x"
TOKEN=$(curl -s -X POST "$AUTH" -H 'Content-Type: application/json' -d '{"email":"user@example.com","password":"secret123","returnSecureToken":true}' | python3 -c "import sys,json;print(json.load(sys.stdin)['idToken'])")
code(){ curl -s -o /dev/null -w "%{http_code}" "$@"; }
echo "anon read /services:        $(code "$FS/services")  (esperado 200)"
echo "anon write /services:       $(code -X PATCH "$FS/services/t1" -H 'Content-Type: application/json' -d '{"fields":{"title":{"stringValue":"x"}}}')  (esperado 403)"
echo "user(no admin) write:       $(code -X PATCH "$FS/projects/t1" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"fields":{"title":{"stringValue":"x"}}}')  (esperado 403)"
echo "anon read /projects:        $(code "$FS/projects")  (esperado 200)"
echo "anon storage read services: $(code "http://127.0.0.1:9199/v0/b/$P.appspot.com/o/services%2Fa%2Fcover.jpg")  (esperado 404, no 403)"
echo "anon storage write:         $(code -X POST "http://127.0.0.1:9199/v0/b/$P.appspot.com/o?name=services%2Fa%2Fx.jpg" -H 'Content-Type: image/jpeg' --data-binary 'x')  (esperado 403)"
echo "user storage write:         $(code -X POST "http://127.0.0.1:9199/v0/b/$P.appspot.com/o?name=services%2Fa%2Fx.jpg" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: image/jpeg' --data-binary 'x')  (esperado 403)"
