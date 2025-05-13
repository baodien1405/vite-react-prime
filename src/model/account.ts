export interface AccountFormValues {
  fullName: string;
  gender: string;
  dateOfBirth: Date | null;
  jobs: string[];
  category: string;
  methods: string[];
  enable: boolean;
  description: string;
}
