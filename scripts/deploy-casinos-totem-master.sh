#!/bin/bash

project_name="casinos-totem"
execute_apt_update="sudo apt update"
execute_apt_upgrade="sudo apt upgrade"
delete_instance_pm2="pm2 delete casinos-totem-app"
now=$(date +'%Y-%m-%dT%H-%M-%S')
backup_file_name="$project_name-$now"
compress_project_folder="tar -cvf $backup_file_name.tar $project_name"
remove_project_folder="rm -r $project_name"
branch="main"
clone_project="git clone -b $branch https://github.com/mythlabsuy/$project_name.git"
install_npm="npm install"
build_project="npm run build"
install_pm2="npm install pm2 -g"
start_pm2="pm2 start npm --name casinos-totem-app -- run start -- -p 3000"

echo "Starting script..."

# Update apt
echo "Updating apt..."
$execute_apt_update || { echo "Failed to update apt. Exiting."; exit 1; }

# Upgrade apt
echo "Upgrading apt packages..."
$execute_apt_upgrade || { echo "Failed to upgrade apt packages. Exiting."; exit 1; }

# Delete existing PM2 instance
echo "Deleting existing PM2 instance..."
$delete_instance_pm2 || { echo "Failed to delete existing PM2 instance. Continuing..."; }

# Check if project folder exists
if [ -d "$project_name" ]; then
    echo "Project folder exists. Archiving and removing..."
    $compress_project_folder && $remove_project_folder || { echo "Failed to archive or remove project folder. Exiting."; exit 1; }
else
    echo "Project folder does not exist."
fi

# Clone project from Git
echo "Cloning project from Git, branch $branch..."
$clone_project || { echo "Failed to clone project from Git. Exiting."; exit 1; }

# Navigate into project directory
cd "$project_name" || { echo "Failed to navigate to project directory. Exiting."; exit 1; }

# Install npm packages
echo "Installing NPM packages..."
$install_npm || { echo "Failed to install npm packages. Exiting."; exit 1; }

# Build project
echo "Building project..."
$build_project || { echo "Failed to build project. Exiting."; exit 1; }

# Install PM2 globally
echo "Installing PM2 globally..."
$install_pm2 || { echo "Failed to install PM2 globally. Exiting."; exit 1; }

# Start project in PM2
echo "Starting project in PM2..."
$start_pm2 || { echo "Failed to start project in PM2. Exiting."; exit 1; }

echo "Script completed successfully."