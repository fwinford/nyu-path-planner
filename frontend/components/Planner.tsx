import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../src/firebase";

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

export default function Planner() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajorId, setSelectedMajorId] = useState<string>("");
  const [plan, setPlan] = useState<Record<string, string[]>>({});

  useEffect(() => {
    console.log("🚀 useEffect running");

    const loadMajors = async () => {
      try {
        const snapshot = await getDocs(collection(db, "majors"));
        const majorData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Major, "id">),
        }));
        console.log("✅ Majors loaded:", majorData);
        setMajors(majorData);
      } catch (err) {
        console.error("❌ Error loading majors:", err);
      }
    };

    loadMajors();
  }, []);

  const handleMajorSelect = async (id: string) => {
    setSelectedMajorId(id);
    try {
      const majorDoc = await getDoc(doc(db, "majors", id));
      const major = majorDoc.data() as Major;
      console.log("📦 Selected major:", major);
      setPlan(major.defaultPlan || {});
    } catch (err) {
      console.error("❌ Error loading selected major:", err);
    }
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
          <option key={m.id} value={m.id}>{m.name}</option>
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
