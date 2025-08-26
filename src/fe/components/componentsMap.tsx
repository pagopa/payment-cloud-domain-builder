// File: src/components/componentsMap.ts
export const componentsMap: { [key: string]: () => Promise<{ default: React.FC<any> }> } = { // eslint-disable-line @typescript-eslint/no-explicit-any
  Kubernetes: () => import('../components/steps/kubernetes-step'),
  CosmosDB: () => import('../components/steps/cosmosdb-step'),
  PostgreSQL: () => import('../components/steps/postgresql-step'),
  Redis: () => import('../components/steps/redis-step'),
};