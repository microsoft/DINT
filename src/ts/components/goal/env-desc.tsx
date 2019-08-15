export type ImpactType = 'H2O' | 'CO2';

export interface EnvDesc {
    impactType: ImpactType,
    amount: string,
    description: string,
}
