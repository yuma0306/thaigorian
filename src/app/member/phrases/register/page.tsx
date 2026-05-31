import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { saveMyCategory } from '../saveMyCategory';

export default function MyCategoryRegisterPage() {
	return <MyCategoryRegister onSave={saveMyCategory} />;
}
