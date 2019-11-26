import React from 'react';
import API from '../../utils/locationAPI';

function CreateLocation() {

    const handleFormSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(API.saveLocation(), {
            method: 'POST',
            body: data,
        })
    }

    return (
        <div className="Location">
            <form onSubmit={handleFormSubmit}>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="location_name">Name</label>
                        <input type="text" name="location_name" class="form-control" id="location_name" required />
                    </div>
                </div>
                <div class="form-group">
                    <label htmlFor="location_address">Address</label>
                    <input type="text" name="location_address" class="form-control" id="location_address" placeholder="1234 Main St" required />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label htmlFor="location_city">City</label>
                        <input type="text" name="location_city" class="form-control" id="location_city" required />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="location_state">State</label>
                        <input type="text" name="location_state" class="form-control" id="location_state" required />
                    </div>
                    <div class="form-group col-md-2">
                        <label htmlFor="location_zip">Zip</label>
                        <input type="text" name="location_zip" class="form-control" id="location_zip" required />
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Does this location have angel shots?</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="angel_shot" value="option1" checked />
                                <label class="form-check-label" htmlFor="angel_shot">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="angel_shot" value="option2" />
                                <label class="form-check-label" htmlFor="angel_shot">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" class="btn btn-primary">Add Location</button>
            </form>
        </div>
    );
};

export default CreateLocation;