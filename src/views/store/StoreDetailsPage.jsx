import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Breadcrumb, Preloader } from "../../components/common/index";
import { STATUS } from '../../utils/status';
import { StoreDetails } from '../../components/store';

const StoreDetailsPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncStoresDetails(storeId));
    }, [storeId]);

    console.log(singleStoreData);

    const storeNameById = {
        [singleStoreData.id]: singleStoreData.name
    }

    return (
        <StoreDetailsPageWrapper>
            <div className='sc-details'>
                <div className='container'>
                    <Breadcrumb dataNameById = { storeNameById } />
                    {
                        singleStoreStatus === STATUS.LOADING ? <Preloader /> : <StoreDetails storeData = { singleStoreData } />
                    }
                </div>
            </div>
        </StoreDetailsPageWrapper>
    )
}

export default StoreDetailsPage;

const StoreDetailsPageWrapper = styled.div`
    background: var(--clr-violet-dark-active);
    
    .sc-details{
        min-height: 100vh;
        padding-top: 65px;
        padding-bottom: 65px;
    }
`;
