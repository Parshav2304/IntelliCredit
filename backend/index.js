const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'IntelliCredit Backend is running.' });
});

// SSE endpoint for AI Research Simulation
app.get('/api/research/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const synthesis = "Secondary research reveals two critical risk signals: an active DRT recovery case (₹4.2 Cr by PNB) and an SFIO probe on the promoter for related-party transactions — both significantly impair character scoring. GST anomalies in Mar-24 and Jun-24 corroborate data integrity concerns flagged during document extraction. On the positive side, sector outlook remains strong per ICRA (+18% FY26), and MCA compliance is clean.\\n\\nThe factory operating at 40% capacity (credit officer observation) limits near-term debt serviceability despite adequate collateral. Combined, the intelligence picture warrants a cautious lending posture — conditional approval at a reduced limit with enhanced monitoring covenants is recommended.";

    let index = 0;
    const chunkLength = 5; // Send 5 characters at a time for streaming effect

    const intervalId = setInterval(() => {
        if (index < synthesis.length) {
            const chunk = synthesis.slice(index, index + chunkLength);
            res.write(`data: ${JSON.stringify({ type: 'content_block_delta', delta: { text: chunk } })}\\n\\n`);
            index += chunkLength;
        } else {
            res.write('data: [DONE]\\n\\n');
            clearInterval(intervalId);
            res.end();
        }
    }, 10);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

// SSE endpoint for CAM Generation Simulation
app.get('/api/cam/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const camText = `COMPANY OVERVIEW\\nSharma Specialty Chemicals Ltd. (CIN: U24100MH2010PLC204762) is a Mumbai-based specialty chemicals manufacturer with revenue of ₹42.8 Cr (FY24) and a 12% revenue CAGR over three years.\\n\\nCREDIT ASSESSMENT — FIVE Cs\\nCharacter: 52/100 — Materially impaired by active SFIO probe on promoter and related-party transaction anomalies. Capacity: 71/100 — DSCR of 1.42x is adequate; however factory utilisation at 40% limits serviceability. Capital: 68/100 — D/E at 1.8x; net worth ₹24.2 Cr, no recent equity infusion. Collateral: 74/100 — Factory property (Mumbai suburb) valued ₹38 Cr, realizable ~₹28 Cr; clean title. Conditions: 66/100 — Sector outlook positive (ICRA: +18% FY26); RBI NBFC tightening creates banking opportunity. COMPOSITE SCORE: 63/100 — MEDIUM-HIGH RISK.\\n\\nKEY RISKS\\nActive DRT recovery suit (₹4.2 Cr, PNB). SFIO promoter probe (related-party transactions). GST revenue inflation anomalies (Mar-24: +112%, Jun-24: +124%). Factory under-utilisation (40%).\\n\\nRECOMMENDATION\\nCONDITIONAL APPROVAL — ₹8.50 Crore (57% of requested ₹15 Cr) at MCLR + 2.75% (~11.5% p.a.), 36-month tenor.\\n\\nKEY COVENANTS\\n• Quarterly stock audit by bank-appointed auditor\\n• Monthly GST reconciliation submission\\n• Promoter personal guarantee mandatory\\n• No dividend declaration without prior bank NOC`;

    let index = 0;
    const chunkLength = 4;

    const intervalId = setInterval(() => {
        if (index < camText.length) {
            const chunk = camText.slice(index, index + chunkLength);
            res.write(`data: ${JSON.stringify({ type: 'content_block_delta', delta: { text: chunk } })}\\n\\n`);
            index += chunkLength;
        } else {
            res.write('data: [DONE]\\n\\n');
            clearInterval(intervalId);
            res.end();
        }
    }, 10);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
