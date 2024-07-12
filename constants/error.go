package constants

import "errors"

var ErrorNoUpdate = errors.New("nothing updated")
var ErrorOwnerAlreadyExists = errors.New("owner already exists")
