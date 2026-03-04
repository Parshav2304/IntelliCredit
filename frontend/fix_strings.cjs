const fs = require('fs');

const files = [
    'src/components/Sidebar.jsx',
    'src/components/Shared.jsx',
    'src/components/DataIngestor.jsx',
    'src/components/ResearchAgent.jsx',
    'src/components/CAMEngine.jsx'
];

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\\\$\{/g, '${')
        .replace(/\\`/g, '`')
        .replace(/\\\\n/g, '\\n')
        .replace(/\\n/g, '\n');
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
});
