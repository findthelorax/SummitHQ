import * as React from 'react';
import AppRoutes from '../../pages/AppRoutes';
import Footer from './Footer';

const Dashboard: React.FC = () => {
	return (
		<div className="flex-1 h-full overflow-y-auto">
			<div className="min-h-full flex flex-col">
				<div className="flex-1 p-4">
					<AppRoutes />
				</div>
				<Footer />
			</div>
		</div>
	);
};

export default Dashboard;
