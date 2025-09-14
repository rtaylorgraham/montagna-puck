#!/bin/bash

echo "Creating GitHub repository..."

# Try to create via API (requires personal access token)
if [ -n "$GITHUB_TOKEN" ]; then
    curl -H "Authorization: token $GITHUB_TOKEN" \
         -H "Accept: application/vnd.github.v3+json" \
         https://api.github.com/user/repos \
         -d '{"name":"montagna-puck","description":"Premium cycling travel platform with Puck visual editor","private":false}'

    if [ $? -eq 0 ]; then
        echo "Repository created successfully!"
        git push -u origin master
    fi
else
    echo "Please create the repository manually:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: montagna-puck"
    echo "3. Make it Public"
    echo "4. DO NOT initialize with any files"
    echo "5. Click 'Create repository'"
    echo ""
    echo "Then run: git push -u origin master"
fi