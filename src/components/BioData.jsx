// {name: "Mahir asief", email: "asiefmahir1@gmail.com", phone: "+885454540", skills: ["Js", "react", "redux"], interests: ["Chess", "football"] }

const BioData = (props) => {
	// props ->
	console.log(props, "props");
	const { name, email, phone, skills, interests } = props;

	return (
		<div className="bio-data">
			<div className="personal-info">
				<h2>BioData of {name}</h2>
				<p>
					<strong>email:</strong> {email}
				</p>
				{phone && (
					<p>
						<strong>phone:</strong> {phone}
					</p>
				)}
			</div>
			<hr />
			<div className="skills">
				<h2>My Skills:</h2>
				<ul>
					{skills.map((skill) => (
						<li key={skill}>{skill}</li>
					))}
				</ul>
			</div>
			<div className="interests">
				<h3>Mt interests:</h3>
				<ul>
					{/* <li>Chess</li>
					<li>Football</li>
					<li>Space Research</li>
					<li>System Design</li>
					<li>DSA</li> */}
					{interests.map((interest) => (
						<li key={interest}>{interest}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

// function add(a, b) {
// 	return a + b;
// }

// add(10, 20);
// add(100, 200);

export default BioData;
