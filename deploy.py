import os
import argparse
import pexpect
import getpass
#  python3 -m venv path/to/venv
# source path/to/venv/bin/activate
# pip install --upgrade pip
# pip3 install requests
#  python3 deploy.py
# Args
parser = argparse.ArgumentParser(description='Args for run command.')
parser.add_argument("--step", type=int, default=3)
parser.add_argument("--id", type=str, default='hsoft')
parser.add_argument("--password", type=str, default='QjO2lTDCF&r|#n|')  # Mật khẩu không còn trong args
parser.add_argument("--env", type=str, default='dev', help='Environment for React build')  # Thêm biến môi trường
args = parser.parse_args()

if args.env == 'prod':
  folder = 'homepage/back_end'
  fileName = 'homepage.tar.gz'
else:
  folder = 'homepage/back_end'
  fileName = 'homepage.tar.gz'

if args.password is None:
  password = getpass.getpass(prompt='Enter password: ')
else:
  password = args.password

domain = '211.234.116.228'
deploySource = f'/home/{args.id}'
deploySourceExtract = f'/home/HanbiroMailcore/docs/{folder}'

def run_command(command):
  child = pexpect.spawn(command)
  i = child.expect([pexpect.TIMEOUT, 'password:', 'Are you sure you want to continue connecting (yes/no)?'], timeout=60)

  if i == 0:  # Timeout
    print("Lỗi: Timeout khi chờ phản hồi.")
    return None
  elif i == 2:  # Yes/no confirmation
    child.sendline('yes')
    child.expect('password:', timeout=60)

  child.sendline(password)
  child.expect(pexpect.EOF, timeout=120)
  return child.before.decode('utf-8')

if args.step >= 3:
  print(f'=== 1. Building {args.env} ===')
  os.system(f'''
  rm -rf {fileName}
  tar --exclude='node_modules' --exclude='.env' --exclude='.git' -czvf {fileName} ./
  ''')

if args.step >= 2:
  print(f'=== 2. Uploading file {args.env} ===')
  scp_command = f'scp -P 22 {fileName} {args.id}@{domain}:{deploySource}'
  run_command(scp_command)

if args.step >= 1:
  print(f'=== 3. Deployment {args.env} ===')
  ssh_command = f'ssh {args.id}@{domain} -p 22 "sudo tar xzfp {deploySource}/{fileName} -C {deploySourceExtract}"'
  run_command(ssh_command)
  ssh_command_bk = f'ssh {args.id}@{domain} -p 22 "tar --exclude=\'node_modules\' --exclude=\'./.env\' -czf /home/{args.id}/out_backup.tar.gz -C {deploySourceExtract} ."'
  run_command(ssh_command_bk)
  ssh_command_pm2 = f'ssh {args.id}@{domain} -p 22 "nvm use 20 && pm2 restart 14"'
  run_command(ssh_command_pm2)