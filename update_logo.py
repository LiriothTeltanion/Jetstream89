import os, shutil, re

src = r'C:\Users\kevin\.gemini\antigravity-ide\brain\6870add7-d4c9-4149-9bf2-2a5aa6586afa\us_road_sign_logo_1785516452994.png'
dst = r'assets\logo-route89.png'
shutil.copyfile(src, dst)

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('./assets/logo.svg', './assets/logo-route89.png')
        content = content.replace('type="image/svg+xml"', 'type="image/png"')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
