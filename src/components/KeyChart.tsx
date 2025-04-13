
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const KeyChart: React.FC = () => {
  const keyMappings = [
    { key: 'A', note: 'Sa', description: 'Shadja - The first note of the octave' },
    { key: 'S', note: 'Ri', description: 'Rishabha - The second note of the octave' },
    { key: 'D', note: 'Ga', description: 'Gandhara - The third note of the octave' },
    { key: 'F', note: 'Ma', description: 'Madhyama - The fourth note of the octave' },
    { key: 'J', note: 'Pa', description: 'Panchama - The fifth note of the octave' },
    { key: 'K', note: 'Dha', description: 'Dhaivata - The sixth note of the octave' },
    { key: 'L', note: 'Ni', description: 'Nishada - The seventh note of the octave' },
    { key: ';', note: 'SA', description: 'Higher Shadja - The first note of the higher octave' },
  ];

  return (
    <div className="my-6 bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-nadhaswaram-primary">Key Mapping Chart</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Keyboard Key</TableHead>
              <TableHead className="w-24">Note</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keyMappings.map((mapping) => (
              <TableRow key={mapping.key}>
                <TableCell className="font-medium bg-nadhaswaram-light text-center">{mapping.key}</TableCell>
                <TableCell className="font-bold text-nadhaswaram-accent">{mapping.note}</TableCell>
                <TableCell>{mapping.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default KeyChart;
