from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine import reflection
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'f89391e08261'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    bind = op.get_bind()
    inspector = reflection.Inspector.from_engine(bind)
    columns = [column['name'] for column in inspector.get_columns('posts')]

    # Only add the author_id column if it doesn't already exist
    if 'author_id' not in columns:
        op.add_column('posts', sa.Column('author_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=True))

def downgrade() -> None:
    op.drop_column('posts', 'author_id')
