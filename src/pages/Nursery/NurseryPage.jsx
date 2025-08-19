import { useMemo, useState } from "react";
import plants, { SEGMENT } from "../../data/plants";
import PlantBabyCard from "../../components/core/PlantBabyCard";

const TAGS = [SEGMENT.U199, SEGMENT.U299, SEGMENT.U399, SEGMENT.U599, SEGMENT.U999];

export default function NurseryPage() {
  const [activeTag, setActiveTag] = useState(null);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return plants.filter(p => {
      const tagOk = activeTag ? p.segment === activeTag : true;
      const qOk = q ? p.name.toLowerCase().includes(q.toLowerCase()) : true;
      return tagOk && qOk;
    });
  }, [activeTag, q]);

  return (
    <>
      <div className="section">
        <div className="row" style={{gap:12}}>
          <input
            className="input"
            placeholder="Search plants..."
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{flex:1}}
          />
          <button className="btn secondary" onClick={() => { setActiveTag(null); setQ(""); }}>Reset</button>
        </div>
        <div className="filters" style={{marginTop:12}}>
          {TAGS.map(t => (
            <button key={t} className={`tag ${activeTag===t ? "active":""}`} onClick={() => setActiveTag(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {list.map(plant => <PlantBabyCard key={plant.id} plant={plant} />)}
      </div>
    </>
  );
}
