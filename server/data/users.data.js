import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Administrator',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isActive: true,
		isAdmin: true,
	},
	{
		name: 'John Doe',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		isActive: true,
		isAdmin: false,
	},
	{
		name: 'Jane Doe',
		email: 'jane@example.com',
		password: bcrypt.hashSync('123456', 10),
		isActive: true,
		isAdmin: false,
	},
];

// console.log(users);

export default users;
