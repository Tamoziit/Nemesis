

const GenderCheckbox = () => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={'label gap-2 cursor-pointer'}>
                    <span className="label-text">Male</span>
                    <input type="checkbox" classname="cahcekbox border-slate-900" />
                </label>
            </div>
            <div className="form-control">
                <label className={'label gap-2 cursor-pointer'}>
                    <span className="label-text">Female</span>
                    <input type="checkbox" classname="cahcekbox border-slate-900" />
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox;