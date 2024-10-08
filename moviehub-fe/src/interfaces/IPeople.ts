interface IPeople {
    id: number;
    name: string;
    gender: number;
    original_name?: string;
    profile_path: string;
    known_for_department: string;
    job: string;
    biography: string;
}

export default IPeople