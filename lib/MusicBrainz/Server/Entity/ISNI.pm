package MusicBrainz::Server::Entity::ISNI;

use Moose;

with 'MusicBrainz::Server::Entity::Role::Editable';

has 'isni' => (
    is => 'rw',
    isa => 'Str'
);

sub url {
    my ($self) = @_;
    return "http://isni-url.oclc.nl/isni/" . $self->isni;
}

sub TO_JSON {
    my ($self) = @_;

    return {
        isni => $self->isni,
    };
}

__PACKAGE__->meta->make_immutable;
no Moose;
1;

=head1 COPYRIGHT

Copyright (C) 2012 MetaBrainz Foundation

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

=cut
