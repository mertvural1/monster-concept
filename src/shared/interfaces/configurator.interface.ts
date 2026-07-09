export interface ConfiguratorOption {
  id: string;
  label: string;
  description: string;
  priceDelta: number;
}

export interface ConfiguratorGroup {
  id: string;
  title: string;
  options: ConfiguratorOption[];
}
