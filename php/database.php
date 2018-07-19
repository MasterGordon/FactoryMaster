CREATE TABLE `users` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `gamedata` mediumtext,
  `gametime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;