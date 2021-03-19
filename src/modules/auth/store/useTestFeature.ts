import { useSelector } from 'store';

export const useTestFeature = (feature: string): boolean => {
  const { settings, profile_id } = useSelector(state => state.auth);

  if (!settings || !settings?.testFeatures) {
    return false;
  }
  if (!Array.isArray(settings?.testFeatures)) {
    return false;
  }
  if (!settings?.testFeatures.includes(feature)) {
    return true; // тестовой фичи в списке нет - показываем
  }
  if (!profile_id || !settings?.testProfileIds || !settings?.testProfileIds.includes(profile_id)) {
    return false; // текущего участника нету в списке тестовых - скрываем
  }
  return true; // все проверки пройдены - показываем
};

