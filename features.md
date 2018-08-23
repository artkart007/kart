
features

 - add/upload art by logged-in user.
 - list art by user.
 - buy feature via paypal

server (express/mysql)
	- support crud operation
	- upload support

client (react)
	- bookmarking support

bottom-up approach---
	- relationship based sql


each user can have many arts.

create table `users` (
  `id` int unsigned not null auto_increment,
  `username` varchar(100) not null,
  primary key(`id`)
);

create table `arts` (
  `id` int unsigned not null auto_increment,
  `user_id` int unsigned not null,
  `custom_name` varchar(25) not null,
  index cn_user_index(`user_id`),
  foreign key (`user_id`) references users(`id`) on delete cascade,
  primary key(`id`)
);
	  





