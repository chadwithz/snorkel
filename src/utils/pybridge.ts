import { MemoryStoredFile } from "nestjs-form-data";
import { spawn } from "node:child_process";

interface PythonFunctions {
  post_text: {
    args: {
      content: string;
      cookies: string;
    },
    result: any;
  };
  post_media: {
    args: {
      content: string;
      media: MemoryStoredFile;
      cookies: string;
    },
    result: any;
  };
  delete_post: {
    args: {
      id: string;
      cookies: string
    },
    result: any;
  };
  change_profile_pic: {
    args: {
      pic: MemoryStoredFile;
      cookies: string;
    },
    result: any;
  };
  get_dms: {
    args: {
      cookies: string;
    },
    result: any;
  }
}

export function callPythonFunction<FuncName extends keyof PythonFunctions>(filePath: string, functionName: FuncName,
  args: PythonFunctions[FuncName]['args']): Promise<PythonFunctions[FuncName]['result']> {
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

