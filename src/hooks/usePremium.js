// useCheckPackageEndTime.js
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { userSelector } from '../store/selector';
import { compareAsc } from 'date-fns';

const usePremium = () => {
    const user = useSelector(userSelector);

    const isPremiumValid = useMemo(() => {
        if (user && user.packageDetail && user.packageDetail.endTime) {
            const endTime = new Date(user.packageDetail.endTime);
            const today = new Date();
            return user.packageDetail.status && compareAsc(endTime, today) === 1;
        }
        return false;
    }, [user]);

    return isPremiumValid;
};

export default usePremium;
