export class Field<T> {
  value: T;
  id: string;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  disabled: boolean;
  options: { key?: string; value?: string; label?: string }[];
  placeholder: string;
  min: number;
  max: number;
  hidden: boolean;
  units: string;
  shouldSearch?: boolean;

  constructor(
    options: {
      value?: T;
      key?: string;
      id?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      disabled?: boolean;
      placeholder?: string;
      options?: { key?: string; value?: string; label?: string }[];
      min?: number;
      max?: number;
      hidden?: boolean;
      units?: string;
      shouldSearch?: boolean;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.id = options.id || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.disabled = options.disabled || false;
    this.placeholder = options.placeholder;
    this.min = options.min;
    this.max = options.max;
    this.hidden = options.hidden || false;
    this.units = options.units || '';
    this.shouldSearch = options?.shouldSearch || false;
  }
}
