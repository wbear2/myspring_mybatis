--<ScriptOptions statementTerminator=";"/>
use arko_services;

create table users
(
	username varchar(50) not null primary key,
	password varchar(50) not null,
	enabled boolean not null
);

use arko_services;
create table authorities
(
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username)
);

use arko_services;
create unique index ix_auth_username on authorities(username,authority);

use arko_services;
insert into users(username,password,enabled) values('user','ee11cbb19052e40b07aac0ca060c23ee',1);
insert into authorities values('user','ROLE_USER');
use arko_services;
insert into users(username,password,enabled) values('admin','21232f297a57a5a743894a0e4a801fc3',1);
insert into authorities values('admin','ROLE_ADMIN');

use arko_services;
select * from users;
select * from authorities;