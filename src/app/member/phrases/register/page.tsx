import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { saveMyCategory } from '../actions';

export default function MyCategoryRegisterPage() {
	return <MyCategoryRegister onSave={saveMyCategory} />;
}
