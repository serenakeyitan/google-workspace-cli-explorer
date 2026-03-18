"""
Test suite for Google Workspace CLI Explorer structure and content
"""
import re
from pathlib import Path
from bs4 import BeautifulSoup
import cssutils
import logging

# Suppress cssutils warnings
cssutils.log.setLevel(logging.ERROR)

PROJECT_ROOT = Path(__file__).parent.parent


def test_html_file_exists():
    """Test that index.html exists"""
    html_file = PROJECT_ROOT / "index.html"
    assert html_file.exists(), "index.html not found"


def test_css_file_exists():
    """Test that style.css exists"""
    css_file = PROJECT_ROOT / "style.css"
    assert css_file.exists(), "style.css not found"


def test_js_file_exists():
    """Test that script.js exists"""
    js_file = PROJECT_ROOT / "script.js"
    assert js_file.exists(), "script.js not found"


def test_html_structure():
    """Test HTML structure and required elements"""
    html_file = PROJECT_ROOT / "index.html"
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Check doctype
    assert soup.contents[0].strip().startswith('<!DOCTYPE html>'), "Missing DOCTYPE declaration"

    # Check meta tags
    assert soup.find('meta', {'charset': True}), "Missing charset meta tag"
    assert soup.find('meta', {'name': 'viewport'}), "Missing viewport meta tag"
    assert soup.find('meta', {'name': 'description'}), "Missing description meta tag"

    # Check title
    title = soup.find('title')
    assert title, "Missing title tag"
    assert 'Google Workspace CLI' in title.text, "Title doesn't mention Google Workspace CLI"

    # Check linked CSS and JS
    assert soup.find('link', {'href': 'style.css'}), "Missing style.css link"
    assert soup.find('script', {'src': 'script.js'}), "Missing script.js link"

    # Check header
    header = soup.find('header')
    assert header, "Missing header element"
    assert soup.find(id='themeToggle'), "Missing theme toggle button"
    assert soup.find(id='searchInput'), "Missing search input"

    # Check main sections
    assert soup.find('section', class_='hero'), "Missing hero section"
    assert soup.find('section', class_='quick-start'), "Missing quick-start section"
    assert soup.find('section', class_='services'), "Missing services section"
    assert soup.find('section', class_='integration-patterns'), "Missing integration-patterns section"

    # Check services grid container
    assert soup.find(id='servicesGrid'), "Missing servicesGrid container"

    # Check footer
    footer = soup.find('footer')
    assert footer, "Missing footer element"


def test_html_no_framework_dependencies():
    """Test that HTML doesn't include framework dependencies"""
    html_file = PROJECT_ROOT / "index.html"
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for common frameworks (should NOT be present)
    frameworks = ['react', 'vue', 'angular', 'jquery', 'bootstrap', 'tailwind']
    for framework in frameworks:
        assert framework not in content.lower(), f"Found framework dependency: {framework}"


def test_css_valid_syntax():
    """Test CSS syntax is valid"""
    css_file = PROJECT_ROOT / "style.css"
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # Parse CSS
    sheet = cssutils.parseString(css_content)
    assert sheet, "Failed to parse CSS"
    assert len(sheet.cssRules) > 0, "No CSS rules found"


def test_css_custom_properties():
    """Test CSS custom properties are defined"""
    css_file = PROJECT_ROOT / "style.css"
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # Check for essential custom properties
    required_vars = [
        '--primary',
        '--surface',
        '--on-surface',
        '--border',
        '--syntax-command',
        '--syntax-string',
        '--syntax-comment'
    ]

    for var in required_vars:
        assert var in css_content, f"Missing CSS custom property: {var}"


def test_css_dark_theme():
    """Test dark theme is defined"""
    css_file = PROJECT_ROOT / "style.css"
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()

    assert '[data-theme="dark"]' in css_content, "Dark theme not defined"


def test_js_services_data():
    """Test JavaScript contains services data"""
    js_file = PROJECT_ROOT / "script.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Check for services data structure
    assert 'servicesData' in js_content, "Missing servicesData variable"

    # Check for expected services
    services = ['drive', 'gmail', 'calendar', 'sheets', 'docs', 'slides', 'admin', 'meet']
    for service in services:
        assert f"'{service}'" in js_content or f'"{service}"' in js_content, \
            f"Service '{service}' not found in servicesData"


def test_js_essential_functions():
    """Test JavaScript contains essential functions"""
    js_file = PROJECT_ROOT / "script.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Check for essential functions
    functions = [
        'toggleTheme',
        'renderServices',
        'initEventListeners',
        'initKeyboardShortcuts',
        'highlightText',
        'highlightCommand'
    ]

    for func in functions:
        assert f'function {func}' in js_content or f'{func} =' in js_content or f'{func}:' in js_content, \
            f"Missing function: {func}"


def test_js_no_framework_dependencies():
    """Test JavaScript is vanilla (no framework imports)"""
    js_file = PROJECT_ROOT / "script.js"
    with open(js_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for framework imports (should NOT be present)
    assert 'import React' not in content, "Found React import"
    assert 'import Vue' not in content, "Found Vue import"
    assert 'from "react"' not in content, "Found React import"
    assert 'from "vue"' not in content, "Found Vue import"
    assert 'require(' not in content, "Found require() statement"


def test_readme_content():
    """Test README contains essential content"""
    readme_file = PROJECT_ROOT / "README.md"
    with open(readme_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for essential sections
    assert '# Google Workspace CLI Explorer' in content, "Missing main title"
    assert 'What is the Google Workspace CLI?' in content, "Missing explanation section"
    assert 'Features' in content, "Missing features section"
    assert 'Tech Stack' in content, "Missing tech stack section"
    assert 'Local Development' in content, "Missing development instructions"
    assert 'MIT License' in content or 'MIT' in content, "Missing license information"

    # Check for live site URL
    assert 'serenakeyitan.github.io' in content, "Missing GitHub Pages URL"

    # Check for installation command
    assert 'npm i -g @googleworkspace/cli' in content, "Missing installation command"


def test_gitignore_exists():
    """Test .gitignore exists"""
    gitignore_file = PROJECT_ROOT / ".gitignore"
    assert gitignore_file.exists(), ".gitignore not found"


def test_license_exists():
    """Test LICENSE file exists"""
    license_file = PROJECT_ROOT / "LICENSE"
    assert license_file.exists(), "LICENSE file not found"


def test_github_workflow_exists():
    """Test GitHub Pages workflow exists"""
    workflow_file = PROJECT_ROOT / ".github" / "workflows" / "pages.yml"
    assert workflow_file.exists(), "GitHub Pages workflow not found"


def test_github_workflow_content():
    """Test GitHub Pages workflow has correct configuration"""
    workflow_file = PROJECT_ROOT / ".github" / "workflows" / "pages.yml"
    with open(workflow_file, 'r', encoding='utf-8') as f:
        content = f.read()

    assert 'github-pages' in content, "Missing github-pages environment"
    assert 'actions/checkout' in content, "Missing checkout action"
    assert 'actions/configure-pages' in content, "Missing configure-pages action"
    assert 'actions/upload-pages-artifact' in content, "Missing upload artifact action"
    assert 'actions/deploy-pages' in content, "Missing deploy action"


if __name__ == '__main__':
    import pytest
    pytest.main([__file__, '-v'])
