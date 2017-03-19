@Component({
    selector: 'sideNav',
    template: `
            <div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <form>
                                <h3 className="">Show information</h3>
                                <FormGroup>
                                    <ControlLabel>Select city:</ControlLabel>
                                    <FormControl
                                        componentClass="select"
                                        onChange={this.handleSetInputData}
                                        placeholder="select"
                                    >
                                        <option value="Rivne">Rivne</option>
                                        <option value="Kiev">Kiev</option>
                                        <option value="Luts'k">Lutsk</option>
                                    </FormControl>
                                </FormGroup>
                                
                               </form>     
                        </div>
                    </div>
`
})
export class  sideNavComponent { }
