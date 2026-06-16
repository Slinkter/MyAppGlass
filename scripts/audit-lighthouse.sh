#!/bin/bash
# Helper script to run local Lighthouse audits on the production static build.

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Lighthouse Auditing Setup...${NC}"

# 1. Build the project
echo -e "${YELLOW}Building the static application...${NC}"
pnpm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed! Please fix build errors before running the audit.${NC}"
  exit 1
fi

# 2. Check if lighthouse CLI is installed
if ! command -v lighthouse &> /dev/null
then
    echo -e "${YELLOW}Lighthouse CLI is not installed globally. We will run it via npx lighthouse.${NC}"
    LH_CMD="npx lighthouse"
else
    LH_CMD="lighthouse"
fi

# 3. Check for python or other local server command to run in background
PORT=5001
echo -e "${YELLOW}Starting local static server on port $PORT in the background...${NC}"
python3 -m http.server $PORT --directory dist > /dev/null 2>&1 &
SERVER_PID=$!

# Ensure the server is killed when the script exits
cleanup() {
  echo -e "${YELLOW}Stopping local server (PID: $SERVER_PID)...${NC}"
  kill $SERVER_PID
}
trap cleanup EXIT

# Give the server a second to start
sleep 2

# 4. Define pages to audit
PAGES=(
  ""
  "/servicios"
  "/blog"
  "/proyectos"
  "/contacto"
)

# Create reports directory
mkdir -p lighthouse-reports

# 5. Run Lighthouse on each page
for PAGE in "${PAGES[@]}"; do
  URL="http://localhost:$PORT$PAGE"
  # Replace slash for filename
  FILE_SAFE_NAME=$(echo "$PAGE" | sed 's/\//_/g')
  if [ -z "$FILE_SAFE_NAME" ]; then
    FILE_SAFE_NAME="home"
  fi
  
  echo -e "${GREEN}Auditing $URL...${NC}"
  $LH_CMD "$URL" --chrome-flags="--headless" --output=html --output-path="./lighthouse-reports/report${FILE_SAFE_NAME}.html" --view=false
done

echo -e "${GREEN}Lighthouse audits complete! Reports saved to './lighthouse-reports/'.${NC}"
