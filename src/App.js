import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
	const [loading, setLoading] = useState(true);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	const fetchData = async () => {
		setLoading(true);

		try {
			const response = await fetch(url);
			const newJobs = await response.json();
			setJobs(newJobs);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return (
			<section className="section loading">
				<h1>loading...</h1>
			</section>
		);
	}
	const { company, dates, duties, title } = jobs[value]; //get me the first item from job array , then get the properties i. company, dates, duties, title
	return (
		<section className="section">
			<div className="title">
				<h2>Experience</h2>
				<div className="underline"></div>
			</div>
			<div className="jobs-center">
				<div className="btn-container">
					{jobs.map((item, index) => {
						return (
							<button
								className={`job-btn ${index === value && `active-btn`}`} //adding active class to hover  i.e if index of btn matches the current state value,add active buttn
								key={item.id}
								onClick={() => setValue(index)}>
								{item.company}
							</button>
						);
					})}
				</div>

				<article className="job-info">
					<h3>{title}</h3>
					<h4>{company}</h4>
					<p className="job-date">{dates}</p>

					{duties.map((duty, index) => {
						//mapping because the arrays are
						return (
							<div key={index} className="job-desc">
								<FaAngleDoubleRight className="job-icon" />
								<p>{duty}</p>
							</div>
						);
					})}
				</article>
			</div>
			<button type="button" className="btn">
				more info
			</button>
		</section>
	);
}

export default App;
