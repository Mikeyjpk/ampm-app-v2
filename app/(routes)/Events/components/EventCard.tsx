interface EventCardProps {
	date: string;
	title: string;
	venue: string;
	city: string;
	link: string;
}

const EventCard: React.FC<EventCardProps> = ({
	date,
	title,
	venue,
	city,
	link,
}) => {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			<div className="flex w-full flex-row justify-between bg-neutral-100/15 items-center py-3 px-4 sm:px-6 md:px-10 rounded-md transition-all duration-300 mix-blend-lighten">
				<div className="flex flex-col lowercase">
					{/* DATE */}
					<span className="font-semibold text-[0.7rem] font-times tracking-wide text-white/80">
						{date}
					</span>

					{/* TITLE */}
					<h2 className="text-[1rem] font-semibold line-clamp-2 overflow-hidden -mt-0.5">
						{title}
					</h2>

					{/* LOCATION */}
					<p className="text-white/90 text-[0.8rem] tracking-wide -mt-1">
						{venue}
						{" // "}
						{city}
					</p>
				</div>

				{/* Keep "TICKETS" text */}
				<div className="px-2.5 py-1 bg-black text-white rounded-lg mix-blend-exclusion">
					<p className="relative z-10  text-center leading-8 font-semibold text-sm">
						TICKETS
					</p>
				</div>
			</div>
		</a>
	);
};

export default EventCard;
