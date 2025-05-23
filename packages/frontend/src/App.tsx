import { useState } from 'react'
import './App.css'

function App() {
  // Define genotype options for both traits
  const traitBOptions = ['BB', 'Bb', 'bb'];
  const traitAOptions = ['AA', 'Aa', 'aa'];
  
  // Define phenotype descriptions for both traits
  const traitDescriptions = {
    B: {
      name: 'Turkin väri',
      dominant: 'Musta',
      recessive: 'Ruskea',
      dominantAllele: 'B',
      recessiveAllele: 'b'
    },
    A: {
      name: 'Hännän pituus',
      dominant: 'Pitkä',
      recessive: 'Lyhyt',
      dominantAllele: 'A',
      recessiveAllele: 'a'
    }
  };
  
  const [parent1TraitB, setParent1TraitB] = useState('BB');
  const [parent1TraitA, setParent1TraitA] = useState('AA');
  const [parent2TraitB, setParent2TraitB] = useState('BB');
  const [parent2TraitA, setParent2TraitA] = useState('AA');

  // Helper to get alleles from genotype string
  function getAlleles(genotype: string) {
    return genotype.split('');
  }

  // Calculate offspring genotype probabilities using Punnett Square logic
  function getOffspringGenotypeProbabilities(p1: string, p2: string) {
    const alleles1 = getAlleles(p1);
    const alleles2 = getAlleles(p2);
    const results: Record<string, number> = {};
    for (const a1 of alleles1) {
      for (const a2 of alleles2) {
        const genotype = [a1, a2].sort().join('');
        results[genotype] = (results[genotype] || 0) + 1;
      }
    }
    // Convert counts to probabilities
    const total = 4;
    return Object.entries(results).map(([gen, count]) => ({
      genotype: gen,
      probability: count / total
    }));
  }

  // Calculate offspring phenotype probabilities for a single trait
  function getTraitPhenotypeProbabilities(p1: string, p2: string, dominantAllele: string) {
    const genotypeProbs = getOffspringGenotypeProbabilities(p1, p2);
    const traitKey = dominantAllele === 'B' ? 'B' : 'A';
    const traitInfo = traitDescriptions[traitKey];
    
    const results: Record<string, number> = { 
      [traitInfo.dominant]: 0, 
      [traitInfo.recessive]: 0 
    };
    
    genotypeProbs.forEach(({ genotype, probability }) => {
      if (genotype.includes(dominantAllele)) {
        results[traitInfo.dominant] += probability;
      } else {
        results[traitInfo.recessive] += probability;
      }
    });
    
    return [
      { phenotype: traitInfo.dominant, probability: results[traitInfo.dominant] },
      { phenotype: traitInfo.recessive, probability: results[traitInfo.recessive] }
    ];
  }

  // Calculate combined phenotype probabilities for both traits
  function getCombinedPhenotypeProbabilities() {
    const traitBPhenotypeProbs = getTraitPhenotypeProbabilities(parent1TraitB, parent2TraitB, 'B');
    const traitAPhenotypeProbs = getTraitPhenotypeProbabilities(parent1TraitA, parent2TraitA, 'A');
    
    return [
      { 
        phenotype: `${traitDescriptions.A.dominant}, ${traitDescriptions.B.dominant}`, 
        probability: traitAPhenotypeProbs[0].probability * traitBPhenotypeProbs[0].probability,
        description: `Kissan ${traitDescriptions.A.name.toLowerCase()} on ${traitDescriptions.A.dominant.toLowerCase()} ja ${traitDescriptions.B.name.toLowerCase()} on ${traitDescriptions.B.dominant.toLowerCase()}`
      },
      { 
        phenotype: `${traitDescriptions.A.dominant}, ${traitDescriptions.B.recessive}`, 
        probability: traitAPhenotypeProbs[0].probability * traitBPhenotypeProbs[1].probability,
        description: `Kissan ${traitDescriptions.A.name.toLowerCase()} on ${traitDescriptions.A.dominant.toLowerCase()} ja ${traitDescriptions.B.name.toLowerCase()} on ${traitDescriptions.B.recessive.toLowerCase()}`
      },
      { 
        phenotype: `${traitDescriptions.A.recessive}, ${traitDescriptions.B.dominant}`, 
        probability: traitAPhenotypeProbs[1].probability * traitBPhenotypeProbs[0].probability,
        description: `Kissan ${traitDescriptions.A.name.toLowerCase()} on ${traitDescriptions.A.recessive.toLowerCase()} ja ${traitDescriptions.B.name.toLowerCase()} on ${traitDescriptions.B.dominant.toLowerCase()}`
      },
      { 
        phenotype: `${traitDescriptions.A.recessive}, ${traitDescriptions.B.recessive}`, 
        probability: traitAPhenotypeProbs[1].probability * traitBPhenotypeProbs[1].probability,
        description: `Kissan ${traitDescriptions.A.name.toLowerCase()} on ${traitDescriptions.A.recessive.toLowerCase()} ja ${traitDescriptions.B.name.toLowerCase()} on ${traitDescriptions.B.recessive.toLowerCase()}`
      },
    ];
  }

  const traitBOffspringProbs = getOffspringGenotypeProbabilities(parent1TraitB, parent2TraitB);
  const traitAOffspringProbs = getOffspringGenotypeProbabilities(parent1TraitA, parent2TraitA);
  const traitBPhenotypeProbs = getTraitPhenotypeProbabilities(parent1TraitB, parent2TraitB, 'B');
  const traitAPhenotypeProbs = getTraitPhenotypeProbabilities(parent1TraitA, parent2TraitA, 'A');
  const combinedPhenotypeProbs = getCombinedPhenotypeProbabilities();

  // Function to get description text for a genotype
  function getGenotypeDescription(genotype: string, traitKey: 'A' | 'B') {
    const trait = traitDescriptions[traitKey];
    const isDominant = genotype.includes(trait.dominantAllele);
    return isDominant ? trait.dominant : trait.recessive;
  }

  return (
    <div className="gene-weaver-app">
      <h1>Kissojen Geenienkutoja</h1>
      
      <div className="trait-legends">
        <div className="trait-legend">
          <h3>{traitDescriptions.A.name}: Alleelit A ja a</h3>
          <p>Dominantti (A): {traitDescriptions.A.dominant}</p>
          <p>Resessiivinen (a): {traitDescriptions.A.recessive}</p>
        </div>
        <div className="trait-legend">
          <h3>{traitDescriptions.B.name}: Alleelit B ja b</h3>
          <p>Dominantti (B): {traitDescriptions.B.dominant}</p>
          <p>Resessiivinen (b): {traitDescriptions.B.recessive}</p>
        </div>
      </div>
      
      <div className="parents-container">
        <div className="parent-column">
          <h2>Vanhempi 1</h2>
          <div className="trait-selector">
            <label>{traitDescriptions.A.name} (A/a):</label>
            <select value={parent1TraitA} onChange={e => setParent1TraitA(e.target.value)}>
              {traitAOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt} - {getGenotypeDescription(opt, 'A')}
                </option>
              ))}
            </select>
          </div>
          <div className="trait-selector">
            <label>{traitDescriptions.B.name} (B/b):</label>
            <select value={parent1TraitB} onChange={e => setParent1TraitB(e.target.value)}>
              {traitBOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt} - {getGenotypeDescription(opt, 'B')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="parent-column">
          <h2>Vanhempi 2</h2>
          <div className="trait-selector">
            <label>{traitDescriptions.A.name} (A/a):</label>
            <select value={parent2TraitA} onChange={e => setParent2TraitA(e.target.value)}>
              {traitAOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt} - {getGenotypeDescription(opt, 'A')}
                </option>
              ))}
            </select>
          </div>
          <div className="trait-selector">
            <label>{traitDescriptions.B.name} (B/b):</label>
            <select value={parent2TraitB} onChange={e => setParent2TraitB(e.target.value)}>
              {traitBOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt} - {getGenotypeDescription(opt, 'B')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="genotype-tables">
        <div className="trait-table">
          <h2>{traitDescriptions.A.name} (A/a): Jälkeläisten Genotyyppien Todennäköisyydet</h2>
          <table>
            <thead>
              <tr>
                <th>Genotyyppi</th>
                <th>Fenotyyppi</th>
                <th>Todennäköisyys</th>
              </tr>
            </thead>
            <tbody>
              {traitAOffspringProbs.map(({ genotype, probability }) => (
                <tr 
                  key={genotype} 
                  className="genotype-row"
                  style={{ backgroundColor: probability > 0 ? `rgba(179, 216, 255, ${probability * 0.3})` : 'transparent' }}
                >
                  <td>{genotype}</td>
                  <td>{getGenotypeDescription(genotype, 'A')}</td>
                  <td>
                    <div className="progress-container" style={{ width: '180px' }}>
                      <div className="progress-genotype" style={{ width: `${probability * 100}%` }} />
                    </div>
                    <span className="probability-text">{(probability * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="trait-table">
          <h2>{traitDescriptions.B.name} (B/b): Jälkeläisten Genotyyppien Todennäköisyydet</h2>
          <table>
            <thead>
              <tr>
                <th>Genotyyppi</th>
                <th>Fenotyyppi</th>
                <th>Todennäköisyys</th>
              </tr>
            </thead>
            <tbody>
              {traitBOffspringProbs.map(({ genotype, probability }) => (
                <tr 
                  key={genotype} 
                  className="genotype-row"
                  style={{ backgroundColor: probability > 0 ? `rgba(179, 216, 255, ${probability * 0.3})` : 'transparent' }}
                >
                  <td>{genotype}</td>
                  <td>{getGenotypeDescription(genotype, 'B')}</td>
                  <td>
                    <div className="progress-container" style={{ width: '180px' }}>
                      <div className="progress-genotype" style={{ width: `${probability * 100}%` }} />
                    </div>
                    <span className="probability-text">{(probability * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="phenotype-tables">
        <div className="trait-table">
          <h2>{traitDescriptions.A.name}: Fenotyyppien Todennäköisyydet</h2>
          <table>
            <thead>
              <tr>
                <th>Fenotyyppi</th>
                <th>Todennäköisyys</th>
              </tr>
            </thead>
            <tbody>
              {traitAPhenotypeProbs.map(({ phenotype, probability }) => (
                <tr 
                  key={phenotype} 
                  className="phenotype-row"
                  style={{ backgroundColor: probability > 0 ? `rgba(255, 206, 200, ${probability * 0.3})` : 'transparent' }}
                >
                  <td>{phenotype}</td>
                  <td>
                    <div className="progress-container" style={{ width: '180px' }}>
                      <div className="progress-phenotype" style={{ width: `${probability * 100}%` }} />
                    </div>
                    <span className="probability-text">{(probability * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="trait-table">
          <h2>{traitDescriptions.B.name}: Fenotyyppien Todennäköisyydet</h2>
          <table>
            <thead>
              <tr>
                <th>Fenotyyppi</th>
                <th>Todennäköisyys</th>
              </tr>
            </thead>
            <tbody>
              {traitBPhenotypeProbs.map(({ phenotype, probability }) => (
                <tr 
                  key={phenotype} 
                  className="phenotype-row"
                  style={{ backgroundColor: probability > 0 ? `rgba(255, 206, 200, ${probability * 0.3})` : 'transparent' }}
                >
                  <td>{phenotype}</td>
                  <td>
                    <div className="progress-container" style={{ width: '180px' }}>
                      <div className="progress-phenotype" style={{ width: `${probability * 100}%` }} />
                    </div>
                    <span className="probability-text">{(probability * 100).toFixed(0)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="combined-phenotypes">
        <h2>Yhdistetyt Fenotyyppien Todennäköisyydet</h2>
        <table>
          <thead>
            <tr>
              <th>Kissan ominaisuudet</th>
              <th>Todennäköisyys</th>
            </tr>
          </thead>
          <tbody>
            {combinedPhenotypeProbs.map(({ phenotype, probability, description }) => (
              <tr 
                key={phenotype} 
                className="combined-phenotype-row"
                style={{ backgroundColor: probability > 0 ? `rgba(215, 196, 255, ${probability * 0.5})` : 'transparent' }}
              >
                <td>{description}</td>
                <td>
                  <div className="progress-container" style={{ width: '180px' }}>
                    <div className="progress-combined" style={{ width: `${probability * 100}%` }} />
                  </div>
                  <span className="probability-text">{(probability * 100).toFixed(0)}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="instructions-container">
        <h2>Kissojen genetiikan simulaattori</h2>
        <p>Tämä sovellus mallintaa kissan ominaisuuksien periytymistä Mendelin periytymissääntöjen mukaisesti.</p>
        <ul>
          <li><strong>{traitDescriptions.A.name} (A/a):</strong> Dominantti alleeli A tuottaa {traitDescriptions.A.dominant.toLowerCase()} hännän, resessiivinen alleeli a tuottaa {traitDescriptions.A.recessive.toLowerCase()} hännän.</li>
          <li><strong>{traitDescriptions.B.name} (B/b):</strong> Dominantti alleeli B tuottaa {traitDescriptions.B.dominant.toLowerCase()} turkin, resessiivinen alleeli b tuottaa {traitDescriptions.B.recessive.toLowerCase()} turkin.</li>
          <li>Valitse molempien vanhempien genotyypit nähdäksesi jälkeläisten ominaisuuksien todennäköisyydet.</li>
        </ul>
      </div>
    </div>
  );
}

export default App
