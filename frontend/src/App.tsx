import { useState } from "react";

const semesters = [
	"Freshman Fall",
	"Freshman Spring",
	"Sophomore Fall",
	"Sophomore Spring",
	"Junior Fall",
	"Junior Spring",
	"Senior Fall",
	"Senior Spring",
];

export default function Planner() {
	const [plan, setPlan] = useState<Record<string, string[]>>(() => {
		return semesters.reduce((acc, semester) => {
			acc[semester] = [];
			return acc;
		}, {} as Record<string, string[]>);
	});

	const [inputCourse, setInputCourse] = useState("");
	const [targetSemester, setTargetSemester] = useState(semesters[0]);

	const addCourse = () => {
		if (!inputCourse.trim()) return;
		setPlan((prev) => ({
			...prev,
			[targetSemester]: [...prev[targetSemester], inputCourse.trim()],
		}));
		setInputCourse("");
	};

	return (
		<div className="min-h-screen bg-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-8 shadow-lg">
                    🎓 NYU 4-Year Course Planner
                </h1>

				<div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
					<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
						<input
							value={inputCourse}
							onChange={(e) => setInputCourse(e.target.value)}
							placeholder="Add course (e.g. CSCI-UA.0201)"
							className="flex-1 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg text-lg transition-all"
						/>
						<select
							value={targetSemester}
							onChange={(e) => setTargetSemester(e.target.value)}
							className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg text-lg transition-all"
						>
							{semesters.map((s) => (
								<option key={s}>{s}</option>
							))}
						</select>
						<button
							onClick={addCourse}
							className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
						>
							✨ Add Course
						</button>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{semesters.map((semester, index) => (
						<div
							key={semester}
							className="bg-white rounded-xl shadow-xl border-t-4 border-gradient-to-r from-pink-500 to-yellow-500 overflow-hidden transform hover:scale-105 transition-all duration-300"
							style={{
								borderTopColor: `hsl(${index * 45}, 70%, 50%)`,
							}}
						>
							<div className="bg-gray-50 p-4">
								<h2 className="font-bold text-lg text-gray-800 text-center">
									{semester}
								</h2>
							</div>
							<div className="p-4 min-h-[200px]">
								{plan[semester].length === 0 ? (
									<div className="text-gray-400 text-center text-sm italic py-8">
										No courses yet...
									</div>
								) : (
									<ul className="space-y-2">
										{plan[semester].map((course, idx) => (
											<li
												key={idx}
												className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
											>
												<span className="font-medium text-gray-800">
													{course}
												</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}