credentials=./credentials/development
systemd_file_path=/etc/systemd/system/steward.service

start:
	./bin/hubot-slack $(credentials)

copy_systemd_file:
	cp -f ./systemd/steward.service $(systemd_file_path)
