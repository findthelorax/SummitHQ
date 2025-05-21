const year = new Date().getFullYear();

const Footer = () => (
	<footer className="w-full py-3 mt-auto bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex justify-center items-center text-center">
		© {year} Brett Ferrante
	</footer>
);

export default Footer;