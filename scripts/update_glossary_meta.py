import os
import re

def clean_title(title):
    # Remove everything after | or /
    title = re.sub(r'\s*[|/].*$', '', title)
    # Remove quotes if they exist
    title = title.strip('"\'')
    return title

def extract_summary(content):
    # Skip frontmatter
    parts = re.split(r'---', content, maxsplit=2)
    if len(parts) < 3:
        return ""
    
    body = parts[2].strip()
    # Remove markdown headers
    body = re.sub(r'^#+.*$', '', body, flags=re.MULTILINE)
    # Get first non-empty paragraph
    paragraphs = [p.strip() for p in body.split('\n\n') if p.strip()]
    if not paragraphs:
        return ""
    
    summary = paragraphs[0]
    # Clean markdown
    summary = re.sub(r'[*_`]', '', summary)
    summary = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', summary)
    
    # Trim to 160 chars
    if len(summary) > 160:
        summary = summary[:157] + "..."
    
    return summary

directory = "/workspaces/voltaje-dev/content/es/glossary"
for filename in os.listdir(directory):
    if filename.endswith(".md") and filename != "index.md":
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse frontmatter
        fm_match = re.match(r'^---\s*(.*?)\s*---', content, re.DOTALL)
        if fm_match:
            fm_content = fm_match.group(1)
            original_fm = fm_content
            
            # Update title
            title_match = re.search(r'^title:\s*(.*)$', fm_content, re.MULTILINE)
            if title_match:
                new_title = clean_title(title_match.group(1))
                fm_content = re.sub(r'^title:.*$', f'title: "{new_title}"', fm_content, flags=re.MULTILINE)
            
            # Generate summary if missing
            if 'resumen:' not in fm_content:
                summary = extract_summary(content)
                if summary:
                    # Escape quotes in summary
                    summary = summary.replace('"', '\\"')
                    fm_content += f'\nresumen: "{summary}"'
            
            new_content = content.replace(original_fm, fm_content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                print(f"Updated {filename}")
