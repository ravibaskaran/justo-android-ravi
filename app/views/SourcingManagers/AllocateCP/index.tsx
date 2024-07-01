import React, { useState } from 'react';
import AllocateCP from './components/AllocateCP'

const AllocateCPScreen = ({ navigation, }: any) => {
    const constantArry: any[] = [
        {
            id: 1,
            cpName: 'CP 1'
        },
        {
            id: 2,
            cpName: 'CP 2'
        },
        {
            id: 3,
            cpName: 'CP 3'
        },
        {
            id: 4,
            cpName: 'CP 4'
        },
        {
            id: 5,
            cpName: 'CP 5'
        },
        {
            id: 6,
            cpName: 'CP 6'
        },
        {
            id: 7,
            cpName: 'CP 7'
        },
        {
            id: 8,
            cpName: 'CP 8'
        },
    ]
    const [cpList, setCpList] = useState([
        {
            id: 1,
            cpName: 'CP 1'
        },
        {
            id: 2,
            cpName: 'CP 2'
        },
        {
            id: 3,
            cpName: 'CP 3'
        },
        {
            id: 4,
            cpName: 'CP 4'
        },
        {
            id: 5,
            cpName: 'CP 5'
        },
        {
            id: 6,
            cpName: 'CP 6'
        },
        {
            id: 7,
            cpName: 'CP 7'
        },
        {
            id: 8,
            cpName: 'CP 8'
        },
    ])
    const [selectedCp, setSelected] = useState<any>([])
    const [allList, setAllList] = useState(false)
    const [CPDetails, setCPDetails] = useState(false)
    const onPressBack = () => {
        navigation.goBack()
    }
    const onPressAllocateCp = () => {
        navigation.goBack()
    }
    const handleSelects = (items: any) => {
        var array: any[] = [...selectedCp];
        array.push(items);
        setSelected(array);
        setCPDetails(true)
    }
    const handleDelete = (items: any, index: any) => {
        var arrays: any[] = [...selectedCp];
        arrays?.splice(index, 1);
        setSelected(arrays);
    }
    const handleSearch = (searchKey: any) => {
        if (searchKey === "") {
            setCpList(constantArry);
        } else {
            const lowerCased = searchKey.toLowerCase();
            const searchArray = [...cpList];
            const list = searchArray.filter((item) => {
                return item.cpName.toLowerCase().match(lowerCased);
            });
            setCpList(list);
        }
    }
    const handleAddTarget = () => {
        setCPDetails(false)
        navigation.navigate('SourcingManager')
    }
    return (
        <AllocateCP
            onPressBack={onPressBack}
            cpList={cpList}
            selectedCp={selectedCp}
            allList={allList}
            setAllList={setAllList}
            handleSearch={handleSearch}
            handleSelects={handleSelects}
            handleDelete={handleDelete}
            CPDetails={CPDetails}
            setCPDetails={setCPDetails}
            handleAddTarget={handleAddTarget}
        // onPressCreate={onPressCreate}
        // type={route?.params?.type || ""}
        />

    )
}

export default AllocateCPScreen;