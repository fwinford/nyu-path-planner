import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const semesters = [
  "Freshman Fall", "Freshman Spring",
  "Sophomore Fall", "Sophomore Spring",
  "Junior Fall", "Junior Spring",
  "Senior Fall", "Senior Spring"
];

type Major = {
  id: string;
  name: string;
  defaultPlan: Record<string, string[]>;
};

console.log("👋 Planner component file is being loaded");
export default function Planner() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<string>("");
  const [plan, setPlan] = useState<Record<string, string[]>>({});

  useEffect(() => {
    console.log("🚀 useEffect running");
    const loadMajors = async () => {
      const snapshot = await getDocs(collection(db, "majors"));
      console.log("📥 Fetched majors snapshot:", snapshot);
      const majorData = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("📄 Doc:", doc.id, data);
        return {
          id: doc.id,
          ...(data as Omit<Major, "id">)
        };
      });
      setMajors(majorData);
      console.log("📦 setMajors called");
    };
    loadMajors();
  }, []);

  const handleMajorSelect = async (id: string) => {
    setSelectedMajorId(id);
    const majorDoc = await getDoc(doc(db, "majors", id));
    const major = majorDoc.data() as Major;
    setPlan(major.defaultPlan || {});
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Plan Your Major</h1>

      <select
        className="border p-2 rounded mb-6"
        onChange={(e) => handleMajorSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select a major</option>
        {majors.map((m) => (
          <option key={m.id} value={m.id}>{m.name || m.id}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {semesters.map((semester) => (
          <div key={semester} className="border p-3 rounded bg-gray-50">
            <h2 className="font-semibold mb-2 text-sm">{semester}</h2>
            <ul className="space-y-1 text-sm">
              {(plan[semester] || []).map((course, idx) => (
                <li key={idx} className="bg-white border p-1 rounded">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
