import { spawn } from "node:child_process";

export function callPythonFunction(filePath: string, functionName: string, args: Record<string, any>): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [filePath]);

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${error}`));
      } else {
        try {
          const result = JSON.parse(output);
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result.result);
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse Python output: ${parseError.message}`));
        }
      }
    });

    // Send the function name and arguments as JSON
    pythonProcess.stdin.write(JSON.stringify({ function: functionName, args }));
    pythonProcess.stdin.end();
  });
}

