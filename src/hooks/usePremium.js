// useCheckPackageEndTime.js
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { userSelector } from '../store/selector';
import { compareAsc } from 'date-fns';

const usePremium = () => {
    const user = useSelector(userSelector);

    const isPremiumValid = useMemo(() => {
        if (user && user.packageDetail && user.packageDetail.status && user.packageDetail.endTime) {
            const endTime = new Date(user.packageDetail.endTime);
            const today = new Date();
            if (compareAsc(endTime, today) !== -1) {
                return true;
            }
        }
        return false;
    }, [user]);

    return isPremiumValid;
};

export default usePremium;
