import { MyCategoryRegister } from '@/components/MyCategoryRegister/MyCategoryRegister';
import { saveMyCategory } from '@/functions/memberCategory/saveMyCategory';

export default function MyCategoryRegisterPage() {
	return <MyCategoryRegister onSave={saveMyCategory} />;
}
