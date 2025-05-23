import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

describe('Gene Weaver App', () => {
  it('renders parent genotype selectors', () => {
    render(<App />);
    expect(screen.getByText(/Parent 1 Genotype/i)).toBeInTheDocument();
    expect(screen.getByText(/Parent 2 Genotype/i)).toBeInTheDocument();
  });

  it('shows genotype and phenotype probability tables', () => {
    render(<App />);
    expect(screen.getByText(/Offspring Genotype Probabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Offspring Phenotype Probabilities/i)).toBeInTheDocument();
  });

  it('updates probabilities when parent genotypes are changed', () => {
    render(<App />);
    const select1 = screen.getAllByRole('combobox')[0];
    const select2 = screen.getAllByRole('combobox')[1];
    // Change both parents to Bb
    fireEvent.change(select1, { target: { value: 'Bb' } });
    fireEvent.change(select2, { target: { value: 'Bb' } });
    // Query the genotype table only
    const genotypeTable = screen.getByText('Offspring Genotype Probabilities').closest('div')?.querySelector('table');
    expect(genotypeTable).toBeInTheDocument();
    const genotypeTableUtils = within(genotypeTable as HTMLElement);
    expect(genotypeTableUtils.getByText('BB')).toBeInTheDocument();
    expect(genotypeTableUtils.getByText('Bb')).toBeInTheDocument();
    expect(genotypeTableUtils.getByText('bb')).toBeInTheDocument();
    // Query the phenotype table only
    const phenotypeTable = screen.getByText('Offspring Phenotype Probabilities').closest('div')?.querySelector('table');
    expect(phenotypeTable).toBeInTheDocument();
    const phenotypeTableUtils = within(phenotypeTable as HTMLElement);
    expect(phenotypeTableUtils.getByText('Dominant')).toBeInTheDocument();
    expect(phenotypeTableUtils.getByText('Recessive')).toBeInTheDocument();
  });
});
