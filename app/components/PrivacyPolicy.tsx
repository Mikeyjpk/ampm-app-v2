const PrivacyPolicy = () => {
	return (
		<div className="flex flex-col text-start gap-3 max-w-2xl gap-y-3">
			<div className="text-center text-lg font-semibold pb-6 pt-3">
				Privacy Policy
			</div>

			<div className="flex flex-col gap-2">
				<div className="font-semibold">1. Information We Collect</div>

				<div>
					<strong>Personal Data:</strong> Name, email address, phone
					number, billing details, and any other information you
					provide when booking a tour.
				</div>
				<div>
					<strong>Payment Information:</strong> Processed securely
					through third-party payment providers. We do not store
					credit/debit card details.
				</div>
				<div>
					<strong>Usage Data:</strong> Information about how you
					interact with our website, including IP addresses, browser
					type, and access times.
				</div>
				<div>
					<strong>Cookies and Tracking Technologies:</strong> We use
					cookies to enhance your experience and track website
					performance.
				</div>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">
					2. How We Use Your Information
				</div>
				<ul>
					<li>
						To process bookings, payments, and customer service
						requests.
					</li>
					<li>
						To improve our website functionality and user
						experience.
					</li>
					<li>
						To send you updates, promotions, and important
						service-related communications.
					</li>
					<li>
						To comply with legal obligations and protect against
						fraudulent activities.
					</li>
				</ul>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">
					3. Sharing and Disclosure of Information
				</div>
				<ul>
					<li>
						<strong>Service Providers:</strong> Third parties
						assisting with bookings, payments, and customer support.
					</li>
					<li>
						<strong>Legal Compliance:</strong> Authorities when
						required by law or for fraud prevention.
					</li>
				</ul>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">4. Data Security</div>
				<p>
					We implement industry-standard security measures to protect
					your personal information. However, no online transmission
					is 100% secure, and we encourage users to take precautions
					when sharing information online.
				</p>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">5. Your Rights and Choices</div>
				<ul>
					<li>Access, update, or delete your personal data.</li>
					<li>Opt-out of promotional communications at any time.</li>
					<li>Disable cookies through your browser settings.</li>
				</ul>
				<p>
					To exercise your rights, contact us at{" "}
					<strong>[Insert Contact Email]</strong>.
				</p>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">6. Third-Party Links</div>
				<p>
					Our website may contain links to third-party websites. We
					are not responsible for their privacy practices and
					encourage you to review their policies before sharing
					personal data.
				</p>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">7. Changes to This Policy</div>
				<p>
					We may update this Privacy Policy periodically. Changes will
					be posted on this page with a revised "Last Updated" date.
				</p>
			</div>

			<div className="flex flex-col">
				<div className="font-semibold">8. Contact Information</div>
				<ul>
					<li>
						<strong>Email:</strong> email@me.com
					</li>
					<li>
						<strong>Phone:</strong> 0123456789
					</li>
				</ul>
			</div>

			<p className="pb-3 pt-5 text-xs text-center">
				By using our mobile website and services, you acknowledge that
				you have read, understood, and agreed to this Privacy Policy.
			</p>
		</div>
	);
};

export default PrivacyPolicy;
