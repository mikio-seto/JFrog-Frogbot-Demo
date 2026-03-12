const { exec } = require('child_process');
const express = require('express');
const app = express();

app.get('/network-test', (req, res) => {
  const targetHost = req.query.host;

  // ⚠️ VULNERABLE: Direct concatenation of user input into a shell command.
  // A SAST tool should flag 'targetHost' as untrusted input reaching 'exec'.
  exec(`ping -c 4 ${targetHost}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(3000, () => console.log('Vulnerable server running on port 3000'));
