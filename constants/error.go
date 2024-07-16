package constants

import "errors"

var ErrorNoUpdate = errors.New("nothing updated")
var ErrorReservationAlreadyExists = errors.New("reservation already exists")
var ErrorOwnerAlreadyExists = errors.New("owner already exists")
