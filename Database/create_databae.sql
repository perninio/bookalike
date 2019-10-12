#drop database bookalike;
create database bookalike;
use bookalike;

create table user (
UserID varchar(255) primary key,
Name varchar (255) not null,
Password varchar (255) not null,
FirstName varchar (255) not null,
BirthDate date not null,
Description varchar (8000),
Graphic varchar(1000) #dostosować rozmiar
);
/*
create table autor (
AutorID int primary key auto_increment,
Name varchar(255) not null,
FirstName varchar (255) not null,
Birthday date,
Description varchar (8000)
);
*/
create table book (
BookID int primary key auto_increment,
Name varchar(255) not null,
`Publishing-house` varchar (255),
Autor varchar(255) ,
#foreign key (AutorID) references autor(AutorID),
Year varchar(16),
BookType varchar(50),#enum('thriller','przygodowa','fantasy','sci-fi','kryminał'),
Description varchar (8000),
Graphic varchar(1000) #dostosować rozmiar
);

create table rate (
RateID int auto_increment primary key,
UserID varchar(255) not null,
BookID int not null,
foreign key(BookID) references book (BookID),
foreign key(UserID) references user (UserID),
Rate int not null,
CHECK (`Rate`<5 AND `Rate`>=0)
);

create table `group` (
GroupID int primary key auto_increment,
Name varchar (500) not null,
Graphic varchar(1000), #dostosować rozmiar
Description varchar (8000)
);

create table group_participants(
GroupParticipantsID int primary key auto_increment,
UserID varchar(255) not null,
foreign key (UserID) references user(UserID),
GroupID int not null,
foreign key (GroupID) references `group`(GroupID)
);

create table user_user_approvement (
ApproveID int primary key,
FirstUserID int not null,
SecondUserID int not null,
Status enum('friends','rejected','follow')
); 

create table post (
PostID int primary key,
UserID varchar(255) not null,
foreign key(UserID) references user(UserID),
Description varchar(8000),
Graphic varchar(500)
);

describe rate;
describe `user`;
describe `group`;
#describe `autor`;
describe post;
describe user_user_approvement;	
describe group_participants;	